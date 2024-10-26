# Github Flavored Markdown (IPL Dashboard)

## Setup

- [Install Gramex 1.x](https://gramener.com/gramex/guide/install/)
- Clone this repository
- From the repo folder, run `gramex setup .`
- From the repo folder, run `gramex`

## Contributions

- Darshan Chouhan <darshan.chouhan@gramener.com>

## Upload Data from CSV to SQlite DB

```python 
import pandas as pd
import sqlite3 as sql3
from ast import literal_eval

db_con = sql3.connect('ipl_data.db')
con = db_con.cursor()

ipl_dt = pd.read_csv("IPL_DATA_2008_to_2022/IPL_Matches_2008_2022.csv")
ipl_dt.to_sql('ipl_matches', db_con, index=False)

ipl_dt = pd.read_csv("IPL_DATA_2008_to_2022/IPL_Ball_by_Ball_2008_2022.csv")
ipl_dt.to_sql('ipl_scorecard', db_con, index=False)

# con.execute('''SELECT top 2 * FROM ipl_matches''').fetchall()

# print(con.execute('''SELECT c.name FROM pragma_table_info('ipl_matches') c''').fetchall())
# [('ID',), ('City',), ('Date',), ('Season',), ('MatchNumber',), ('Team1',), ('Team2',), ('Venue',), ('TossWinner',), ('TossDecision',),
# ('SuperOver',), ('WinningTeam',), ('WonBy',), ('Margin',), ('method',), ('Player_of_Match',), ('Team1Players',), ('Team2Players',), ('Umpire1',), ('Umpire2',)]

# Explode the data for ipl_all_season_team_players  table
cnx = sql3.connect('ipl_data.db')
df = pd.read_sql_query("SELECT * FROM ipl_all_season_team_players", cnx)
df['Players'] = df['Players'].apply(literal_eval)
df = df.explode('Players')
df.to_csv('explode_data.csv')


# Read the csv file & insert
foo = pd.read_csv('explode_data.csv', index_col=False)
db_con = sql3.connect('ipl_data.db')
foo.to_sql('ipl_all_season_team_players', db_con, index=False, if_exists='replace')

