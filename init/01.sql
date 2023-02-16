USE rockPaperScissors;

CREATE TABLE user_scores (
    id int,
    playerName VARCHAR(255),
    roundsWon int,
    roundsLost int,
    gamesWon int
);

INSERT INTO user_scores(id, playerName, roundsWon, roundsLost, gamesWon) VALUES
(1,'EENA',9,14,1),
(2,'Amirus',15,6,3),
(3,'Sesks',8,7,1);