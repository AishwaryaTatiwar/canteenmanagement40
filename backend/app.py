# import cv2
# from flask import Flask, jsonify
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Load pre-trained model for human detection (using Haar cascades)
# human_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')

# def count_humans(image_path):
#     # Read the image from the local directory
#     image = cv2.imread(image_path)
    
#     if image is None:
#         print(f"Error: Unable to load image from {image_path}")
#         return 0
    
#     # Convert the image to grayscale
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # Detect humans in the image
#     humans = human_cascade.detectMultiScale(gray, 1.1, 4)
    
#     # Return the number of humans detected
#     return len(humans)

# # Endpoint to get the latest human count from the local image
# @app.route('/human_count', methods=['GET'])
# def get_human_count():
#     image_path = "./uploads/one.jpeg"  # Specify the image path in your uploads folder
#     human_count = count_humans(image_path)
#     return jsonify({'human_count': human_count})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)













from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
from ultralytics import YOLO  # Import YOLO from ultralytics
import cv2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained YOLOv8 model (download automatically if not present)
yolo_model = YOLO("yolov8n.pt")  # 'yolov8n.pt' is the smallest model, you can use 'yolov8s.pt' for more accuracy.

def count_humans(image_path):
    # Load the image
    results = yolo_model(image_path)  # Run YOLOv8 inference
    
    # Filter detections for 'person' class (class ID 0 in COCO dataset)
    human_detections = [
        detection for detection in results[0].boxes.data 
        if int(detection[5]) == 0  # Class ID 0 corresponds to 'person'
    ]
    
    # Return the number of humans detected
    return len(human_detections)

# Endpoint to get the latest human count from the local image
@app.route('/human_count', methods=['GET'])
def get_human_count():
    image_path = "./uploads/people.jpg"  # Specify the image path in your uploads folder
    try:
        human_count = count_humans(image_path)
        return jsonify({'human_count': human_count})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
