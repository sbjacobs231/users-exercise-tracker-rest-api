// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to connect the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/user_exercises_db',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Succesffully connected to MongoDB using Mongoose!');
});

// Define the schema
const exerciseSchema = mongoose.Schema({
    username: { type: String, required: true },
    activityName: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    rest: { type: Number, required: false },
    weight: { type: Number, required: false }
});

// Compile the model from the schema. This must be doone after defining the schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Create an Exercise
 * @param { String } username
 * @param { String } activityName
 * @param { Number } sets
 * @param { Number } reps
 * @param { Number } rest
 * @param { Number } weight
 * @returns A promise. Resolves to JSON object for the document created by calling save().
 */
const createExercise = async (username, activityName, sets, reps, rest, weight) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({
        username: username,
        activityName: activityName,
        sets: sets,
        reps: reps,
        rest: rest,
        weight: weight
    });

    // Call save() to persist this object as a document in MongoDB.
    return exercise.save();
}

/**
 * Retrieve exercises based on the filter, projection and limit parameters.
 * @param { Object } filter
 * @param { String } projection
 * @param { Number } limit
 */
const readExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Update the activityName, sets, reps, rest, weight of the exercise with the id value provided.
 * @param { String } _id
 * @param { String } activityName
 * @param { Number } sets
 * @param { Number } reps
 * @param { Number } rest
 * @param { Number } weight
 * @returns A promise. Resolves to the number of documents modified.
 */
const updateExercise = async (_id, username, activityName, sets, reps, rest, weight) => {
    const result = await Exercise.replaceOne(
        { _id: _id }, 
        { username: username, activityName: activityName, sets: sets, reps: reps, rest: rest, weight: weight }
    );
    return result.modifiedCount;
}

/**
 * Delete the exercise with the provided id.
 * @param { String } _id
 * @returns A promise. Resolves to the count of deleted documents.
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted documents(0/1).
    return result.deletedCount; 
}

export { createExercise, readExercises, updateExercise, deleteExercise }