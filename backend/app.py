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

# from flask import Flask, jsonify
# from flask_cors import CORS
# from ultralytics import YOLO
# import cv2
# import os
# import time
# import threading

# app = Flask(__name__)
# CORS(app)

# # YOLO Model Initialization
# yolo_model = YOLO("yolov8n.pt")

# # Paths
# VIDEO_PATH = "./video/input_video.mp4"
# FRAME_PATH = "./uploads/people.jpg"

# # Global variable to store the latest human count
# latest_human_count = None

# def save_frame_every_20_seconds(video_path, output_path):
#     """
#     Extract frames every 20 seconds and save to output path.
#     """
#     cap = cv2.VideoCapture(video_path)
#     fps = int(cap.get(cv2.CAP_PROP_FPS))
#     frame_interval = 20 * fps  # Frame interval corresponding to 20 seconds
#     frame_count = 0

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         if frame_count % frame_interval == 0:
#             cv2.imwrite(output_path, frame)  # Save the frame
#             yield output_path  # Return the saved frame path
#         frame_count += 1

#     cap.release()

# def count_humans(image_path):
#     """
#     Detect humans in the given image using YOLO.
#     """
#     results = yolo_model(image_path)  # Run YOLOv8 inference
#     human_detections = [
#         detection for detection in results[0].boxes.data
#         if int(detection[5]) == 0  # Class ID 0 corresponds to 'person'
#     ]
#     return len(human_detections)

# def process_video():
#     """
#     Process the video and update the global human count every 20 seconds.
#     """
#     global latest_human_count

#     # Process each frame every 20 seconds
#     for frame_path in save_frame_every_20_seconds(VIDEO_PATH, FRAME_PATH):
#         human_count = count_humans(frame_path)
#         latest_human_count = human_count  # Update the global variable
#         print(f"Frame processed. Humans detected: {human_count}")

#         # Simulate real-time delay for 20 seconds
#         time.sleep(20)

# @app.route('/start_processing', methods=['GET'])
# def start_processing():
#     """
#     Start the video processing in a separate thread.
#     """
#     try:
#         processing_thread = threading.Thread(target=process_video)
#         processing_thread.start()
#         return jsonify({'message': 'Video processing started.'})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/human_count', methods=['GET'])
# def get_human_count():
#     """
#     Get the human count for the latest processed frame.
#     """
#     global latest_human_count
#     if latest_human_count is not None:
#         return jsonify({'human_count': latest_human_count})
#     else:
#         return jsonify({'message': 'No frame has been processed yet.'})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
