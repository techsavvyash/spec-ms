import os
import configparser
import pandas as pd
from urllib.parse import quote
from smart_open import smart_open
from sqlalchemy import create_engine


configuartion_path = os.path.dirname(os.path.abspath(__file__)) + "/config.ini"
print(configuartion_path)
config = configparser.ConfigParser()
config.read(configuartion_path);

port = config['CREDs']['port']
host = config['CREDs']['host']
user = config['CREDs']['user']
password = config['CREDs']['password']
database = config['CREDs']['database']
aws_key = config['CREDs']['AWS_ACCESS_KEY']
aws_secret=config['CREDs']['AWS_SECRET_ACCESS_KEY']
bucket_name=config['CREDs']['AWS_BUCKET_NAME']
object_key=config['CREDs']['AWS_OBJ_KEY']

engine='postgresql://'+user+':%s@'+host+':'+port+'/'+database
con=create_engine(engine %quote(password))
cur = con.connect()

def aggTransformer(valueCols={ValueCols}):
    path = 's3://{AWSKey}:{AWSSecretKey}@{BucketName}/{ObjKey}'.format(aws_key, aws_secret, bucket_name, object_key)
    df_events = pd.read_csv(smart_open(path))
    col_list = df_events.columns
    df_snap = df_events[col_list]
    df_snap.columns = valueCols
    try:
         for index,row in df_snap.iterrows():
            values = []
            for i in valueCols:
              values.append(row[i])
            query = ''' INSERT INTO {TargetTable}({InputCols}) VALUES ({Values}) ON CONFLICT ({ConflictCols}) DO UPDATE SET {ReplaceFormat};'''\
            .format(','.join(map(str,values)))
            cur.execute(query)
    except Exception as error:
        print(error)

aggTransformer()

















