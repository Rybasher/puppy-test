from fastapi import HTTPException
from starlette import status


class ScheduleCreatingError(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                         detail="Status is not correct")