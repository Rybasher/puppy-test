from datetime import datetime, timedelta

from starlette import status
from fastapi import HTTPException
from app.schemas.schemas import AppointmentBase, AppointmentCreate, AppointmentStatus, AppointmentsResponse, \
    AppointmentVisitDate, AppointmentResponse
from databases import Database
from sqlalchemy import select, update, delete, insert, and_
from app.db.models import Appointment
from core.exeption import ScheduleCreatingError


class AppointmentRepository:
    def __init__(self, db: Database):
        self.db = db

    async def get_appointment_by_id(self, appointment_id: int):
        query = select([Appointment]).where(Appointment.id == appointment_id)
        result_item = await self.db.fetch_one(query=query)
        return AppointmentResponse.parse_obj(result_item)


    async def create_appointment(self,
                                 appointment: AppointmentCreate) -> AppointmentCreate:
        db_appointment = AppointmentCreate(
            owner_name=appointment.owner_name,
            dog_name=appointment.dog_name,
            status=appointment.status,
            service=appointment.service,
            visit_date=appointment.visit_date,
            update_at=datetime.utcnow(),
            registration_date=datetime.utcnow()
        )
        appointment_dict = db_appointment.dict()
        query = insert(Appointment).values(**appointment_dict)
        try:
            await self.db.execute(query)
        except Exception:
            raise ScheduleCreatingError()
        return AppointmentCreate(**appointment_dict)

    async def update_appointment(self, appointment_id: int,
                                 appointment: AppointmentCreate) -> AppointmentCreate:
        db_appointment = AppointmentCreate(
            owner_name=appointment.owner_name,
            dog_name=appointment.dog_name,
            status=appointment.status,
            service=appointment.service,
            visit_date=appointment.visit_date,
            registration_date=appointment.registration_date,
            update_at=datetime.utcnow(),
        )
        appointment_dict = db_appointment.dict()
        query = update(Appointment).where(Appointment.id == appointment_id).values(**appointment_dict)
        try:
            await self.db.execute(query)
        except Exception:
            raise ScheduleCreatingError()

        return AppointmentCreate(**appointment_dict)

    async def delete_appointment(self, appointment_id: int):
        user = await self.get_appointment_by_id(appointment_id=appointment_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item Id not found")
        query = delete(Appointment).where(Appointment.id == appointment_id)
        await self.db.execute(query=query)
        return HTTPException(status_code=status.HTTP_200_OK, detail=f"Item ID {appointment_id} deleted")

    async def change_status(self, appointment_status: str, appointment_id: int):
        db_appointment = AppointmentStatus(
            status=appointment_status,
        )
        appointment_dict = db_appointment.dict()
        query = update(Appointment).where(Appointment.id == appointment_id).values(**appointment_dict)
        try:
            await self.db.execute(query)
        except Exception:
            raise ScheduleCreatingError()
        return HTTPException(status_code=status.HTTP_200_OK, detail=f"Appointment ID {appointment_id} "
                                                                    f"change status to {appointment_status}")

    async def get_appointment_by_date(self, date) -> AppointmentsResponse:
        date_time_obj = datetime.strptime(date, '%Y-%m-%d')
        query = select([Appointment]).where(Appointment.visit_date >= date_time_obj,
                                            Appointment.visit_date < date_time_obj + timedelta(days=1))
        res = [AppointmentResponse.parse_obj(data) for data in await self.db.fetch_all(query=query)]
        return AppointmentsResponse(items=res)

    async def change_visit_date(self, appointment_visit: datetime, appointment_id: int):
        db_appointment = AppointmentVisitDate(
            visit_date=appointment_visit,
        )
        appointment_dict = db_appointment.dict()
        query = update(Appointment).where(Appointment.id == appointment_id).values(**appointment_dict)
        await self.db.execute(query)
        return HTTPException(status_code=status.HTTP_200_OK, detail=f"Appointment ID {appointment_id} "
                                                                    f"change visit date to {appointment_visit}")

    async def search_history(self, owner_name, dog_name) -> AppointmentsResponse:
        query = select([Appointment]).where(and_(Appointment.owner_name.ilike(f"%{owner_name}%"),
                                                 Appointment.dog_name.ilike(f"%{dog_name}%")))

        res = [AppointmentResponse.parse_obj(data) for data in await self.db.fetch_all(query=query)]
        return AppointmentsResponse(items=res)
