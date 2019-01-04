import psycopg2
import csv
import codecs
import sys
from configparser import ConfigParser

def create_table(columnList, tablenName, conn):
    createTableStatement = "CREATE TABLE " + tablenName + " ( "

    type = 'TEXT'
    for column in columnList[0:-1]:
        createTableStatement += column + ' ' + type + ' ,'

    # append the last column
    createTableStatement += columnList[-1] + ' ' + type + ' )'
    print ( createTableStatement )
    cursor = conn.cursor()
    cursor.execute (createTableStatement)
    conn.commit()


def insert_data (table, columns, rowstr, conn):
    #print ( columns )
    insertStatement = "INSERT INTO " + table + '(' + columns + ') VALUES (' + rowstr + ')'
    # print ( insertStatement )
    cursor = conn.cursor()
    cursor.execute (insertStatement)
    conn.commit()


def config(filename='.database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()

    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def main (argList):
    try:
        exceptionFile = argList[0].replace('.', '.exception.')

        csvException = csv.writer(open (exceptionFile, "w"))

        with open(argList[0], "r") as file:
            file.seek(0)
            sniffdialect = csv.reader(codecs.iterdecode(file, 'utf-8'))
            data = csv.reader(file, dialect=sniffdialect)
            listOfRows = list(data)
            listRange = len(listOfRows)
            headers = listOfRows[0]
            csvException.writerow(headers);
            # print (headers);
            tableName = argList[0].split('/')[-1].split('.')[0]

        params = config()

        connection = psycopg2.connect(**params)

        cursor = connection.cursor()
        # Print PostgreSQL Connection properties
        print ( connection.get_dsn_parameters(),"\n")

        # Print PostgreSQL version
        #cursor.execute("SELECT version();")
        #record = cursor.fetchone()
        #print("You are connected to - ", record,"\n")
        #connection.commit()
        tableName = "cherre_sample_data" + '.' + tableName

        create_table (headers, tableName, connection)
        columnStr = ','.join(headers)

        for i in range (1, listRange):
            #skip mismatch rown with non-matching columns
            if (len(headers) != len(listOfRows[i])):
                # print (listOfRows[i])
                csvException.writerow(listOfRows[i])
                continue
            # replace quote ' with escape
            aRow = map (lambda x: x.replace("\'", ""), listOfRows[i])

            # put ' ' around string
            rowStr = ','.join(map(lambda x: "'" + x + "'",aRow))
            insert_data (tableName, columnStr, rowStr, connection)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    except csv.Error:
        print("CSV reading error")
    except ValueError:
        print ("Value assign Eror")
    finally:
        #closing database connection.
        '''
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        '''
        if (file):
            file.close()

if __name__ == "__main__":
    main(sys.argv[1:])