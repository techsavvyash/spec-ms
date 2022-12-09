from flask import Flask,request
import configparser
import os
import psycopg2
import pandas as pd

app = Flask(__name__)


configuartion_path = os.path.dirname(os.path.abspath(__file__)) + "/config.ini"
print(configuartion_path)
config = configparser.ConfigParser()
config.read(configuartion_path);


port = config['CREDs']['port']
host = config['CREDs']['host']
user = config['CREDs']['user']
password = config['CREDs']['password']
database = config['CREDs']['database']

con = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
cur = con.cursor()

def stud_atte(valueCols=['date','schoolId','total_students','students_attendance_marked']):
    df_events = pd.read_csv('/home/ramya/CQube/INPUTS/input_students_attendance_marked.csv')
    df_calc = df_events.groupby(['school_id','Date'], as_index=False).agg({"total_students":"sum","students_attendance_marked":"sum"})
    df_calc = df_calc[valueCols]
    try:
         for index,row in df_calc.iterrows():
            values = []
            for i in valueCols:
              values.append(row[i])
            query = ''' INSERT INTO ingestion.student_attendance_by_school(date,schoolId,total_students,students_attendance_marked) VALUES ({}) ON CONFLICT (school_id,Date) DO UPDATE SET total_students= excluded.total_students,students_attendance_marked= excluded.students_attendance_marked;'''\
            .format(','.join(map(str,values)))
            cur.execute(query)
            con.commit()
    except Exception as error:
        print(error)


stud_atte()

