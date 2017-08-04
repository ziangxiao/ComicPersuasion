#Author: Xinran
import csv
# Input data
inputDataName = 'pos'
# inputData = 'neg'
# Output data
data_out = []
var_data_out=[]

# store the label message
pos_label_list = [ ['' for col in range(5)] for row in range(27)]
neg_label_list = [ ['' for col in range(5)] for row in range(27)]

def get_one_message_data(line, start_index, msg_num,label_list,bit = 27):
    for i in range(start_index,start_index+bit):
        if(line[i]!=''):
            #print(neg_label_list[i - start_index][msg_num - 1])
            if (label_list[i - start_index][msg_num - 1] == '0'):
                return str((-1) * int(line[i]))
            return line[i]
    return None

def decimal_to_ternary(dec, base = 3):
    tempStr = ''
    temp = dec
    while (temp > 0):
        ord = temp % base
        tempStr = str(ord) + tempStr
        temp = int(temp / base)
    #print(tempStr)
    if(len(tempStr)<3):
        for i in range(0,3-len(tempStr)):
            tempStr = str(0) + tempStr
    return tempStr

# open the label file, read in the data
with open('messageLabel.csv') as messageLabel:
    label_csv = csv.reader(messageLabel)
    headers = next(label_csv)
    count = 0
    for line in label_csv:
        for i in range(1,6):
            pos_label_list[count][i - 1] = line[i]
        for i in range(6,11):
            neg_label_list[count][i - 6] = line[i]
        count += 1


# select input data
if inputDataName == 'pos':
    datafile = 'positiveMessageFirstBatchData.csv'
    label = pos_label_list
elif inputDataName == 'neg':
    datafile = 'negativeMessageFirstBatchData.csv'
    label = neg_label_list

# open the input file
with open(datafile) as inputData:
    input_csv = csv.reader(inputData)
    headers = next(input_csv)
    ac1_index = headers.index('AC1')
    ac2_index = headers.index('AC2')
    for line in input_csv:
        # Delete the invalid data
        # when the AC1 and AC2 are both incorrect
        if(line[ac1_index]!='2' or line[ac2_index]!='1'):
            continue

        # Get the data of every message
        # 5 message in total
        # print(line)
        msg_data_list = []
        for i in range(1,6):
            start_index = headers.index('M'+str(i)+'_000_1')
            msg_data = get_one_message_data(line,start_index,i,label)
            msg_data_list.append(msg_data)
        data_out.append(msg_data_list)

        #Get the data of every variation
        var_data_list = []
        #print(line)

        for i in range(0,27):
            data_num =decimal_to_ternary(i)
            tmp = 0
            nullValue=True
            for j in range(1,6):
                data_index = headers.index('M' +str(j)+ '_'+data_num+'_1')
                if(line[data_index] != ''):
                    nullValue=False
                    if (label[i][j-1] == '0'):
                        tmp += (-1) * int(line[data_index])
                    else:
                        tmp += int(line[data_index])
                    #print(str(tmp)+' , '+str(j)+ '_'+str(data_num))
                # else:
                #      tmp = None
            if not nullValue:
                var_data_list.append(tmp)
            else:
                var_data_list.append('')

        var_data_out.append(var_data_list)

with open(inputDataName+'_msg_output.csv','w') as msg_f:
    msg_csv = csv.writer(msg_f)
    header = ['M'+str(i) for i in range(1,6)]
    msg_csv.writerow(header)
    for line in data_out:
        msg_csv.writerow(line)

with open(inputDataName+'_var_output.csv','w') as var_f:
    var_csv = csv.writer(var_f)
    header = [decimal_to_ternary(i) for i in range(27)]
    var_csv.writerow(header)
    for line in var_data_out:
        var_csv.writerow(line)

with open(inputDataName+'_item_output.txt','w') as var_f:
    var_csv = csv.writer(var_f)
    header = ['gesture','dist','shading','y']
    var_csv.writerow(header)
    for line in var_data_out:
        for i in range(0,27):
            if line[i]!='':
                dataNum = decimal_to_ternary(i)
                dataTuple = [dataNum[0],dataNum[1],dataNum[2],line[i]]
                var_csv.writerow(dataTuple)
