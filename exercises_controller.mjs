import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

/**
 * Create a new exercise with the following:
 * username
 * activityName
 * sets
 * reps
 * rest
 * weight
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.username,
        req.body.activityName,
        req.body.sets,
        req.body.reps,
        req.body.rest,
        req.body.weight
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400.
            // A better approach will be to examine the error and send
            // an error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Read all exercises for the user that is logged in.
 */
app.get('/exercises/:_username', (req, res) => {
    let filter = { username: req.params._username };
    exercises.readExercises(filter, '', 0)
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the params and set its properties
 * provided in the request body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(
        req.params._id,
        req.body.username,
        req.body.activityName,
        req.body.sets,
        req.body.reps,
        req.body.rest,
        req.body.weight
        )
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ 
                    _id: req.params._id,
                    username: req.body.username,
                    activityName: req.body.activityName,
                    sets: req.body.sets,
                    reps: req.body.reps,
                    rest: req.body.rest,
                    weight: req.body.weight
                });
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query paramters.
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).json({ deletedCount: deletedCount });
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});