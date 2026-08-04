SELECT * FROM scores;
DROP TABLE scores;
CREATE TABLE scores (
 id SERIAL PRIMARY KEY,
 player VARCHAR(50),
 score INTEGER,
 level VARCHAR(20),
 class VARCHAR(1)
);

SELECT * FROM scores;

INSERT INTO scores (player, score, level, class) VALUES
 ('Alice', 850, 'Expert','A'),
 ('Bob', 420, 'Intermediate','B'),
 ('Charlie', 950, 'Expert','A'),
 ('Diana', 310, 'Beginner','A'),
 ('Eve', 670, 'Intermediate','B'),
 ('Frank', 500, 'Intermediate','A'),
 ('Grace', 920, 'Expert','B'),
 ('Hank', 150, 'Beginner','B'),
 ('Ivy', 780, 'Expert','A'),
 ('Jack', 240, 'Beginner','B');

INSERT INTO scores (player, score, level, class) VALUES
('Kirk', 620, NULL,'B');

SELECT COUNT(*) AS num_row, COUNT(level) AS num_level FROM scores;



SELECT AVG(score) AS avg_score FROM scores;
SELECT AVG(score)::Numeric(10,2) AS avg_score_rounded FROM scores;

SELECT SUM(score) AS sum_score, 
MIN(level) AS min_asc, MAX(level) AS max_dsc FROM scores;

SELECT COUNT(DISTINCT level) AS num_levels FROM scores;

SELECT SUM(score) FROM scores WHERE level = 'Master'; 
SELECT COALESCE(SUM(score),0) AS total_or_empty FROM scores WHERE level = 'Master'; 
SELECT COUNT(*) FROM scores WHERE level = 'Master'; 
 
SELECT level,COUNT(*) AS level_count FROM scores
GROUP BY level;


SELECT level, STRING_AGG(DISTINCT class, ', '), SUM(score) AS total_score 
FROM scores GROUP BY level ORDER BY CASE level
 WHEN 'Beginner' THEN 1
 WHEN 'Intermediate' THEN 2
 WHEN 'Expert' THEN 3
 ELSE 4
 END;

 SELECT level, COUNT(*) FROM scores
 GROUP BY level;

SELECT level, SUM(score) FROM scores 
WHERE score > 200 GROUP BY level;

SELECT level, SUM(score) FROM scores 
WHERE score > 200 GROUP BY level 
HAVING SUM(score)>600;

SELECT level, SUM(score) FROM scores 
WHERE score > 200 GROUP BY level 
HAVING AVG(score)>600;

SELECT SUM(score) AS total FROM scores 
HAVING SUM(score) > 1000; 

SELECT 
SUM(score) AS total_score,
SUM(score) FILTER(WHERE level ='Expert') AS scored_by_expert,
SUM(score)-SUM(score) FILTER(WHERE level ='Expert') AS scored_by_others
FROM scores ;

SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY score) As percentile FROM scores;

SELECT MODE() WITHIN GROUP (ORDER BY score) As mode FROM scores; 

SELECT player,score, level,class,
AVG(score) OVER(PARTITION BY class)::integer as level_avg
FROM scores;


