

from xml.etree.ElementTree import tostring


h = 140
hList = []
print('Start')
while(h<=190):
    print(h)
    if(h==140):
        hList.append('140cm以下')
    elif(h==190):
        hList.append('190cm以上')
        break
    else:
        hList.append(h)
    h=h+1

print(hList)

