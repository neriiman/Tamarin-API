# Tamarin API

## Översikt

Backend API för en träningsapp riktad till kvinnor.

Fokus:

- Hemmaträning
- Workouts
- Warmups
- Cooldowns
- Utmaningar (challenges)
- Favoritmarkerade videos

---

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL (Neon)
- pg
- Zod
- JWT Authentication
- Render (deployment)

---

## Arkitektur

Projektet använder lagerindelning:

- Controllers
- Services
- Repositories (DB)
- Middleware
- Validators (Zod)

Struktur:

src/

- controllers/
- services/
- db/
- middleware/
- validators/
- routes/
- types/
- config/

---

## Databas

### users

Användare i systemet.

### challenges

Träningsutmaningar.

### categories

Kategorier för utmaningar.

### videos

Träningsvideos.

Kolumner:

- id (uuid)
- url
- title
- published_date
- thumbnail_url
- duration (sekunder)
- view_count
- type

Video types:

- warmup
- workout
- cooldown

### user_favourites

Join-tabell mellan users och videos.

Kolumner:

- user_id
- video_id
- created_at

Constraint:

- UNIQUE(user_id, video_id)

---

## Authentication

JWT Bearer Token.

Protected routes använder:

authMiddleware

Publika routes som kan dra nytta av användarinfo använder:

optionalAuthMiddleware

Exempel:

GET /videos

Kan anropas:

- som gäst
- som inloggad användare

Om användaren är inloggad returneras även:

isFavourited

för varje video.

---

## API Endpoints

### Auth

POST /api/auth/register

POST /api/auth/login

### Users

GET /api/users/me

### Challenges

GET /api/challenges

GET /api/challenges/:id

### Categories

GET /api/categories

### Videos

GET /api/videos

Query params:

- page
- limit
- type
- search
- sort
- order

GET /api/videos/:id

### Favourites

POST /api/videos/:videoId/favorite

Toggle favorite.

GET /api/users/me/favorites

Hämtar användarens favoritvideos.

---

## Pagination Response Format

Standardformat:

{
"results": number,
"data": [],
"page": number,
"limit": number,
"hasNextPage": boolean,
"totalCount": number,
"totalPages": number
}

---

## Kodstandard

- Zod används för validation.
- Services innehåller affärslogik.
- Repositories ansvarar för databasåtkomst.
- Controllers ska vara tunna.
- SQL skrivs med parametriserade queries.
- UUID används som primärnycklar.

---

## Nuvarande Fokus

- Videos
- Favorites
- Query filtering
- Pagination
- Deployment
- Frontend integration
