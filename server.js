const express = require("express");
const app = express();

const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/users", async(req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next();
    }
});

app.get("/api/places", async (req, res, next) => {
    try {
        const places = await prisma.place.findMany();
        res.json(places);

    } catch (error) {
        next();
    }
});

app.get("/api/vacations", async (req, res, next) => {
    try {
        const vacations = await prisma.place.findMany();
        res.json(vacations);
        
    } catch (error) {
        next();
    }
});

app.post("/api/users/:id/vacations", async () => {
    try {
        const userId = +req.params.id;
        const { placeId, travelDate } = req.body;
        const vacation = await prisma.vacation.create({
            data: {
                userId,
                placeId,
                travelDate
            }
        });
        res.status(201).json(vacation);

    } catch (error) {
        next();
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? "Internal server error.";
    res.status(status).json({message});
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});