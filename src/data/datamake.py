
from sqlalchemy import true

setList = '''営業職
経理職
企画・管理職
事務・アシスタント職
販売・サービス職
専門職
金融系専門職
公務員・教員・農林水産関連職
技術職
医療系専門職
クリエイター・クリエイティブ職
'''

n=0

name = ''
jobList = []
while(n<len(setList)):
    if('職' in name):
        jobList.append(name)
        print(name)
        name = ''
    else:
        name+=setList[n]
    n+=1

print(jobList)
