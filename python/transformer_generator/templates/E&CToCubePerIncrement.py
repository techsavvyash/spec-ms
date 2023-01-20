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
    df_dataset = pd.read_sql('select * from {Table};', con=con)
    df_dimension = pd.read_sql('select {DimensionCols} from {DimensionTable}', con=con)
    event_dimension_merge = df_events.merge(df_dimension, on=['{MergeOnCol}'], how='inner')
    event_dimension_merge = event_dimension_merge.groupby({GroupBy}, as_index=False).agg({AggCols})
    event_dimension_merge['{RenameCol}'] = event_dimension_merge['{eventCol}']
    merge_col_list = []
    for i, j in (event_dimension_merge.columns.to_list(), df_dataset.columns.to_list()):
        if (i == j):
            merge_col_list.append(j)
    df_agg = event_dimension_merge.merge(df_dataset, on=merge_col_list, how='inner')
    df_agg['percentage'] = ((df_agg['{NumeratorCol}'] / df_agg['{DenominatorCol}']) * 100)  ### Calculating Percentage
    {DatasetCasting}
    df_snap = df_agg[valueCols]
    try:
        for index, row in df_snap.iterrows():
            values = []
            for i in valueCols:
                values.append(row[i])
            query = ''' INSERT INTO {TargetTable} As main_table({InputCols}) VALUES ({Values}) ON CONFLICT ({ConflictCols}) DO UPDATE SET {IncrementFormat},percentage=(({QueryNumerator})/({QueryDenominator}))*100;'''.format(','.join(map(str, values)),{UpdateCols})
            cur.execute(query)
    except Exception as error:
        print(error)

aggTransformer()
