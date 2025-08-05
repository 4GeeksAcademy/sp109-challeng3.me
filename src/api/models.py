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
    img: Mapped[str] = mapped_column(nullable=True)

    team: Mapped[List["Team"]] = relationship(back_populates="user")
    user_tournament: Mapped[List["User_tournament"]] = relationship(back_populates="user")
    user_team: Mapped[List["User_team"]] = relationship(back_populates="user")
    user_videojuego: Mapped[List["User_videojuego"]] = relationship(back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "level": self.level,
            "points": self.points,
            "premium": self.premium,
            "premium_end_date": self.premium_end_date,
            "img": self.img,
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
    type: Mapped[str] = mapped_column(nullable=False)

    user_tournament: Mapped[List["User_tournament"]] = relationship(back_populates="tournament")
    team_tournament: Mapped[List["Team_tournament"]] = relationship(back_populates="tournament")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "prize": self.prize,
            "type": self.type,
            # do not serialize the password, its a security breach
        }
    
class Team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    level: Mapped[int] = mapped_column(nullable=False)
    premium: Mapped[bool] = mapped_column(nullable=True)
    img: Mapped[str] = mapped_column(nullable=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="team")

    user_team: Mapped[List["User_team"]] = relationship(back_populates="team")
    team_tournament: Mapped[List["Team_tournament"]] = relationship(back_populates="team")
    videojuego_team: Mapped[List["Game_team"]] = relationship(back_populates="team")

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
    name: Mapped[str] = mapped_column(unique=True ,nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    platforms: Mapped[str] = mapped_column(nullable=True)
    release_date: Mapped[str] = mapped_column(nullable=True)
    img: Mapped[str] = mapped_column(nullable=True)
    genre: Mapped[str] = mapped_column(nullable=True)

    user_videojuego: Mapped[List["User_videojuego"]] = relationship(back_populates="videojuego")
    videojuego_team: Mapped[List["Game_team"]] = relationship(back_populates="videojuego")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "platforms": self.platforms,
            "release_date": self.release_date,
            "img": self.img,
            "genre": self.genre,
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
    status: Mapped[str] = mapped_column(nullable=True)

    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    team: Mapped["Team"] = relationship(back_populates="user_team")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="user_team")

    def serialize(self):
        return {
            "id": self.id,
            "team_id": self.team_id,
            "user_id": self.user_id,
            "status": self.status
        }

class User_videojuego(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    ranking: Mapped[str] = mapped_column(nullable=True)

    videojuego_id: Mapped[int] = mapped_column(ForeignKey("videojuego.id"))
    videojuego: Mapped["Videojuego"] = relationship(back_populates="user_videojuego")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="user_videojuego")

    def serialize(self):
        return {
            "id": self.id,
            "ranking": self.ranking,
            "videojuego_id": self.videojuego_id,
            "user_id": self.user_id
        }
    
class Team_tournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    ranking: Mapped[int] = mapped_column(nullable=False)

    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    team: Mapped["Team"] = relationship(back_populates="team_tournament")
    tournament_id: Mapped[int] = mapped_column(ForeignKey("tournament.id"))
    tournament: Mapped["Tournament"] = relationship(back_populates="team_tournament")

    def serialize(self):
        return {
            "id": self.id,
            "ranking": self.ranking,
            "team_id": self.team_id,
            "tournament_id": self.tournament_id
        }

class Game_team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    ranking: Mapped[int] = mapped_column(nullable=True)

    videojuego_id: Mapped[int] = mapped_column(ForeignKey("videojuego.id"))
    videojuego: Mapped["Videojuego"] = relationship(back_populates="videojuego_team")
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    team: Mapped["Team"] = relationship(back_populates="videojuego_team")
    

    def serialize(self):
        return {
            "id": self.id,
            "ranking": self.ranking,
            "videojuego_id": self.videojuego_id,
            "team_id": self.team_id
        }