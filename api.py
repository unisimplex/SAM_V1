from flask import Flask, request, redirect, url_for , jsonify
import mysql.connector
import os
import numpy as np
import face_recognition
from flask_cors import CORS
from werkzeug.utils import secure_filename
from io import BytesIO
from PIL import Image
import base64


app = Flask(__name__)
CORS(app)
app.config['Image_db'] = 'Image_db'
app.config['UPLOAD_FOLDER'] = 'Uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'port': 3307,
    'database': 'sam_db'
}

def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

@app.route('/api/enroll', methods=['POST'])
def enroll():
    data = request.form
    name = data['name']
    roll_number = data['roll_number']
    course = data['course']
    year = data['year']
    section = data['section']
    file = request.files['image']
    if file and file.filename != '':
        file_extension = os.path.splitext(file.filename)[1]
        image_path = os.path.join(app.config['Image_db'], roll_number+file_extension)
        file.save(image_path)

        known_image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(known_image)

        if len(face_encodings) > 0:
            face_encoding = face_encodings[0]

            face_encoding_str = ','.join(map(str, face_encoding.tolist()))
        else:
            face_encoding_str = ''  
    else:
        image_path = ''
        face_encoding_str = ''

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO student (name, roll_number, course, year, section, image_path, face_encoding)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', (name, roll_number, course, year, section, image_path, face_encoding_str))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Enrollment successful!"})


@app.route('/recognize', methods=['POST'])
def recognize():
    if 'image' not in request.files:
        return jsonify({'message': 'No image file found!'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No selected file!'}), 400

    filename = secure_filename(file.filename)
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(image_path)

    unknown_image = face_recognition.load_image_file(image_path)
    unknown_encodings = face_recognition.face_encodings(unknown_image)

    if len(unknown_encodings) > 0:
        unknown_encoding = unknown_encodings[0]

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT name, face_encoding FROM student')
        students = cursor.fetchall()

        match_found = False
        for student in students:
            face_encoding_str = student['face_encoding']
            known_encoding = np.fromstring(face_encoding_str, sep=',')
            results = face_recognition.compare_faces([known_encoding], unknown_encoding)

            if results[0]:
                match_found = True
                matched_student = student['name']
                break

        cursor.close()
        conn.close()
        

        if match_found:
            return jsonify({'message': f'Match found! Student: {matched_student}'}), 200
        else:
            return jsonify({'message': 'No match found.'}), 200
    else:
        return jsonify({'message': 'No face detected in the uploaded image.'}), 400




if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    if not os.path.exists(app.config['Image_db']):
        os.makedirs(app.config['Image_db'])
    app.run(debug=True)
