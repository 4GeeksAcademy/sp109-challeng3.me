from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List



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

    team: Mapped[List["Team"]] = relationship(back_populates="user")
    user_tournament: Mapped[List["User_tournament"]] = relationship(back_populates="user")
    user_team: Mapped[List["User_team"]] = relationship(back_populates="user")

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
    level: Mapped[int] = mapped_column(nullable=False)
    prize: Mapped[int] = mapped_column(nullable=False)

    user_tournament: Mapped[List["User_tournament"]] = relationship(back_populates="tournament")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "prize": self.prize,
            # do not serialize the password, its a security breach
        }
    
class Team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    level: Mapped[int] = mapped_column(nullable=False)
    premium: Mapped[bool] = mapped_column(nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="team")

    user_team: Mapped[List["User_team"]] = relationship(back_populates="team")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "premium": self.premium,
            "user_id": self.user_id
        }
class Videojuego(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    videojuegos: Mapped[str] = mapped_column(nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "videojuegos": self.videojuegos,
            # do not serialize the password, its a security breach
        }

class User_tournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    tournament_id: Mapped[int] = mapped_column(ForeignKey("tournament.id"))
    tournament: Mapped["Tournament"] = relationship(back_populates="user_tournament")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="user_tournament")

    def serialize(self):
        return {
            "id": self.id,
            "tournament_id": self.tournament_id,
            "user_id": self.user_id
        }
    
class User_team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    team: Mapped["Team"] = relationship(back_populates="user_team")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="user_team")

    def serialize(self):
        return {
            "id": self.id,
            "team_id": self.team_id,
            "user_id": self.user_id
        }
