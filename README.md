## 🌐 Social Performance Dashboard

A full-stack web application that tracks and visualizes brand metrics by fetching live data from the GitHub REST API.

- Backend: Django + Django REST Framework
- Frontend: React (Vite) + Axios + Chart.js
- Database: PostgreSQL (Supabase)
- Deployment-ready for Render (backend) and Vercel (frontend)

---

## 🚀 Features

- CRUD for brands (name, platform, handle)
- Fetch live GitHub metrics (followers, repos, following, profile URL)
- Persist last fetched stats on the brand
- CORS-enabled API with environment-based settings
- Clean REST endpoints for integration testing

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Axios, Chart.js |
| Backend | Django 5, Django REST Framework |
| Database | PostgreSQL (Supabase)|
| API Integration | GitHub REST API |
| Deployment | Render (API), Vercel (Web) |

---

## 📁 Project Structure

```
social-performance-dashbaord/
├── client/                 # React frontend (Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── server/                 # Django backend (DRF)
    ├── apps/
    │   └── brands/         # Brand models, views, serializers
    ├── core/               # Django project settings/urls
    ├── manage.py
    └── requirements.txt
```

---

## ⚙️ Backend Setup (Django)

1) Move into the backend folder
```bash
cd server
```

2) Create and activate virtual environment
```bash
# Windows (PowerShell)
python -m venv .venv
.venv\Scripts\Activate

# Mac/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3) Install dependencies
```bash
pip install -r requirements.txt
```

4) Create .env (environment variables)
Create a file named `.env` in `server/`:
```ini
# Core
SECRET_KEY=replace-with-a-secure-random-string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL required)
DB_NAME=postgres
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOW_ALL_ORIGINS=True
# If not allowing all origins, provide a comma-separated list:
# CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

5) Apply database migrations
```bash
python manage.py makemigrations

python manage.py migrate
```

6) Run the API locally
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`. The client expects `http://127.0.0.1:8000/api` by default.

---

## 💻 Frontend Setup (React + Vite)

1) Move into the frontend folder
```bash
cd ../client
```

2) Install dependencies
```bash
npm install
```

3) Configure API URL (optional)
Create `client/.env.local` if you want to override the default:
```ini
VITE_API_URL=http://127.0.0.1:8000/api
```
If not set, the app will default to `http://127.0.0.1:8000/api` as defined in `client/src/services/api.js`.

4) Run the frontend
```bash
npm run dev
```
Open the app at `http://127.0.0.1:5173`.

---

## 🧪 How to Test the API

Base URL: `http://127.0.0.1:8000/api`

- List brands
```bash
curl http://127.0.0.1:8000/api/brands/
```

- Create a brand
```bash
curl -X POST http://127.0.0.1:8000/api/brands/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Andrej","platform":"github","handle":"karpathy"}'
```

- Fetch & persist GitHub metrics for a brand by id
```bash
curl http://127.0.0.1:8000/api/brands/1/fetch_metrics/
```

- Fetch GitHub metrics by handle (without saving)
```bash
curl http://127.0.0.1:8000/api/fetch-metrics/karpathy/
```

- Delete a brand
```bash
curl -X DELETE http://127.0.0.1:8000/api/brands/1/
```

---

## 🔌 Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/brands/` | List all brands |
| POST | `/api/brands/` | Create a new brand |
| GET | `/api/brands/<id>/fetch_metrics/` | Fetch and update brand metrics |
| GET | `/api/fetch-metrics/<handle>/` | Fetch metrics without persisting |
| DELETE | `/api/brands/<id>/` | Delete a brand |

---

## 🧭 How It Works

1) Add a brand (platform `github` and a GitHub username as handle).  
2) Fetch metrics, which calls GitHub and updates the brand with latest stats.  
3) The frontend displays metrics (followers and repos) in charts.

---

## 🧰 Deployment (Brief)

- Backend (Render)
  - Build: `pip install -r server/requirements.txt`
  - Start: `gunicorn core.wsgi`
  - Env: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`, optional DB vars, CORS settings

- Frontend (Vercel)
  - Env: `VITE_API_URL=https://your-backend.example.com/api`
  - Build: Vercel detects Vite automatically

---

## 🧠 Troubleshooting

- CORS error: ensure `CORS_ALLOW_ALL_ORIGINS=True` (dev) or configure allowed origins.
- Null followers/repos: metrics not fetched yet; call the fetch endpoint.
- GitHub rate limit: wait up to 1 hour or use a tokenized proxy if needed.
- 404 on brand actions: ensure the brand exists and you are using the correct `<id>`.

---


## ✨ Credits

- Developed by Shubham Mote (`https://github.com/moteshubham`)
- Live App: `https://social-performance-dashbaord.vercel.app`

