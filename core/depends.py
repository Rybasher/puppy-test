from app.services.services import AppointmentRepository
from core.db import db


def get_appointment_repository() -> AppointmentRepository:
    return AppointmentRepository(db)
