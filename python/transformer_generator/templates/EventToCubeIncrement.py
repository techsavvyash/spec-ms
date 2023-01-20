import os
import configparser
import pandas as pd
from urllib.parse import quote
from sqlalchemy import create_engine


configuartion_path = os.path.dirname(os.path.abspath(__file__)) + "/config.ini"
print(configuartion_path)
config = configparser.ConfigParser()
config.read(configuartion_path);

port = config['CREDs']['db_port']
host = config['CREDs']['db_host']
user = config['CREDs']['db_user']
password = config['CREDs']['db_password']
database = config['CREDs']['Database']
# aws_key = config['CREDs']['AWS_ACCESS_KEY']
# aws_secret=config['CREDs']['AWS_SECRET_ACCESS_KEY']
# bucket_name=config['CREDs']['AWS_BUCKET_NAME']
# object_key=config['CREDs']['AWS_OBJ_KEY']

engine='postgresql://'+user+':%s@'+host+':'+port+'/'+database
con=create_engine(engine %quote(password))
cur = con.connect()

def aggTransformer(valueCols={ValueCols}):
    # path = 's3://{AWSKey}:{AWSSecretKey}@{BucketName}/{ObjKey}'.format(aws_key, aws_secret, bucket_name, object_key)
    # df_events = pd.read_csv(smart_open(path))
    df_events = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/events/" + {KeyFile})
    df_dimension = pd.read_sql('select {DimensionCols} from {DimensionTable}', con=con)
    event_dimension_merge = df_events.merge(df_dimension, on=['{MergeOnCol}'], how='inner')
    df_agg = event_dimension_merge.groupby({GroupBy}, as_index=False).agg({AggCols})
    df_agg['{RenameColOne}'] = df_agg['{AggColOne}']
    df_agg['{RenameColTwo}'] = df_agg['{AggColTwo}']
    {DatasetCasting}
    df_snap = df_agg[valueCols]
    try:
         for index,row in df_snap.iterrows():
            values = []
            for i in valueCols:
              values.append(row[i])
            query = ''' INSERT INTO {TargetTable} As main_table({InputCols}) VALUES ({Values}) ON CONFLICT ({ConflictCols}) DO UPDATE SET {IncrementFormat};'''\
            .format(','.join(map(str,values)),{UpdateCol})
            cur.execute(query)
    except Exception as error:
        print(error)

aggTransformer()

















