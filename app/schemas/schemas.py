from pydantic import BaseModel
from datetime import datetime
from typing import List


class AppointmentBase(BaseModel):
    owner_name: str
    dog_name: str
    status: str
    service: str


class AppointmentResponse(AppointmentBase):
    id: int
    visit_date: datetime


class AppointmentCreate(AppointmentBase):
    registration_date: datetime
    visit_date: datetime
    update_at: datetime


class AppointmentStatus(BaseModel):
    status: str


class AppointmentVisitDate(BaseModel):
    visit_date: datetime


class AppointmentsResponse(BaseModel):
    items: List[AppointmentResponse]
