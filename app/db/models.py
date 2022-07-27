from core.db import Base
from sqlalchemy import Column, Integer, String, DateTime
from enum import Enum as Enums
from sqlalchemy.types import Enum


class Status(str, Enums):
    WAITING = 'Waiting'
    PROCESSING = 'Processing'
    DONE = 'Done'


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    owner_name = Column(String)
    dog_name = Column(String)
    service = Column(String)
    visit_date = Column(DateTime)
    registration_date = Column(DateTime)
    update_at = Column(DateTime)
    status = Column(Enum(Status))
