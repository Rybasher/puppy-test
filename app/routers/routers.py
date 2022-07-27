from fastapi import Depends, APIRouter
from app.services.services import AppointmentRepository
from core.depends import get_appointment_repository
from app.schemas.schemas import AppointmentCreate, AppointmentBase, AppointmentsResponse, AppointmentResponse
from app.db.models import Status

router = APIRouter()


@router.post("/create_appointment", response_model=AppointmentCreate)
async def create_appointment(appointment: AppointmentCreate,
                             appointment_repository: AppointmentRepository = Depends(get_appointment_repository)):
    return await appointment_repository.create_appointment(appointment=appointment)


@router.get("/appointment/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment_by_id(appointment_id: int,
                                appointment_repository: AppointmentRepository = Depends(get_appointment_repository)):
    return await appointment_repository.get_appointment_by_id(appointment_id=appointment_id)


@router.post("/appointment/{appointment_id}/update", response_model=AppointmentCreate)
async def update_appointment(
                             appointment: AppointmentCreate,
                             appointment_id: int,
                             appointment_repository: AppointmentRepository = Depends(get_appointment_repository), ):
    return await appointment_repository.update_appointment(appointment_id=appointment_id, appointment=appointment,)


@router.post("/appointment/{appointment_id}/delete")
async def delete_appointment(appointment_id: int,
                             appointment_repository: AppointmentRepository = Depends(get_appointment_repository)):
    return await appointment_repository.delete_appointment(appointment_id=appointment_id)


@router.post("/appointment/{appointment_id}/change_status")
async def change_status(appointment_status: Status,
                        appointment_id: int,
                        appointment_repository: AppointmentRepository = Depends(get_appointment_repository), ):
    return await appointment_repository.change_status(appointment_id=appointment_id,
                                                      appointment_status=appointment_status)


@router.post("/appointment/{appointment_id}/change_visit_date")
async def change_visit_date(appointment_visit,
                            appointment_id: int,
                            appointment_repository: AppointmentRepository = Depends(get_appointment_repository), ):
    return await appointment_repository.change_visit_date(appointment_id=appointment_id,
                                                          appointment_visit=appointment_visit)


@router.get("/appointment/{date}/", response_model=AppointmentsResponse)
async def get_appointment_by_data(date,
                                  appointment_repository: AppointmentRepository = Depends(get_appointment_repository)):
    return await appointment_repository.get_appointment_by_date(date=date)


@router.get("/appointment/{owner_name}/{dog_name}/", response_model=AppointmentsResponse)
async def get_appointment_history(owner_name, dog_name,
                                  appointment_repository: AppointmentRepository = Depends(get_appointment_repository)):
    return await appointment_repository.search_history(owner_name=owner_name, dog_name=dog_name)
