let mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    PlayerID: 'string',
    Status: 'string',
    TeamID: 'string',
    Team: 'string',
    Jersey: 'string',
    PositionCategory: 'string',
    Position: 'string',
    MLBAMID: 'string',
    FirstName: 'string',
    LastName: 'string',
    PreferredFirstName: 'string',
    BatHand: 'string',
    ThrowHand: 'string',
    Height: 'string',
    Weight: 'string',
    BirthDate: 'string',
    BirthCity: 'string',
    BirthState: 'string',
    BirthCountry: 'string',
    HighSchool: 'string',
    College: 'string',
    ProDebut: 'string',
    Salary: 'string'
  }
);

export default mongoose.model('Player', schema);
