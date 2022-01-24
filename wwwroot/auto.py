a = ''
index = 201
i = 0
with open('opendata110road.json',encoding="utf-8", mode = 'r') as file:
    data = file.read()
    while (len(data) > (i+6)):
	    if (data[i] == 'c' and data[i+1] =='a' and data[i+2] =='s' and data[i+3] =='e' and data[i+4] =='7' and data[i+5] =='7' and data[i+6] =='7'):
	    	data = data.replace("case777", f"case{index}", 1)
	    	index = index + 1
	    i = i + 1
with open('opendata110roadsss.json',encoding="utf-8", mode = 'w') as file:
	file.write(data)
    