from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column



db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username : Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    level: Mapped[int] = mapped_column(nullable=True)
    points: Mapped[int] = mapped_column(nullable=True)
    premium: Mapped[bool] = mapped_column(nullable=True)
    premium_end_date: Mapped[int] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "level": self.level,
            "points": self.points,
            "premium": self.premium
        }
    
class Admin(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username : Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Tournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    level: Mapped[str] = mapped_column(nullable=False)
    prize: Mapped[str] = mapped_column(nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "prize": self.prize,
            # do not serialize the password, its a security breach
        }
    
class Videojuego(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    videojuegos: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "videojuegos": self.videojuegos,
            # do not serialize the password, its a security breach
        }

