from __future__ import print_function
import json
import requests
from httplib2 import Http
from oauth2client import file, client, tools
import  psycopg2


from apiclient.discovery import build

def insert_fields (cursor):

    # Setup the Sheets API
    SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
    store = file.Storage("token.json")
    creds = store.get()

    data_labels = ['data_type','field_name','name','long_description']

    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials-bernard918.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('sheets', 'v4', http=creds.authorize(Http()))

    # Call the Sheets API
    SPREADSHEET_ID = '17SuLuPP0HwKfyCjNWaidG6ZS0YDCuet_tCLNHJ6IZBs'
    worksheets = ['MVP']

    for currentsheet in worksheets:
        RANGE_NAME = currentsheet + '!A2:E76'
        result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID,
                                                 range=RANGE_NAME).execute()


        values = result.get('values', [])
        if not values:
            print('No data found.')
        else:
            #print('object', 'data_type', 'field_name', 'name', 'description')
            assert isinstance(values, object)
            for row in values:
                fieldDescription = row[4].strip('\"')
                cursor.execute("""INSERT INTO marketplace.field (name,type,label,description,is_part_of,context_id)
                   VALUES (%s, %s, %s, %s, 'lot',1)""", (row[2],row[1],row[3],row[4]) )

                #print (fieldDescription)
                #cursor.execute("""UPDATE marketplace.field SET description = %s WHERE name=%s""",
                #             (fieldDescription, row[2]) )


try:
    connection = psycopg2.connect(user = "app@rebloc-sql",
                                  password = "Rebl0cMvpWe1c0me",
                                  host = "rebloc-sql.postgres.database.azure.com",
                                  port = "5432",
                                  database = "rebloc_data",
                                  sslmode="require",
                                  sslrootcert='//Users/bernardlin/Downloads/root.crt')

    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print ( connection.get_dsn_parameters(),"\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")

    insert_fields (cursor)
    connection.commit()


except (Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)

finally:
    #closing database connection.
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

