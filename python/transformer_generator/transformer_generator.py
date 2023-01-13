import json
from flask import Flask,request,Response
from transformer_keys_mapping import collect_keys

app = Flask(__name__)

@app.route('/generator',methods=['POST'])
def TransformerGenerator():
    try:
         return collect_keys(request,Response)
    except Exception as error:
        print(error)
        return  Response(json.dumps({"Message": "Transformer not created"}))


if (__name__ == "__main__"):
    app.run(debug=True,host ='0.0.0.0',port=3003)



