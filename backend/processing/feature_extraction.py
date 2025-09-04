import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose

def extract_measurements(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with mp_pose.Pose(static_image_mode=True) as pose:
        results = pose.process(img_rgb)

        if not results.pose_landmarks:
            return {"error": "No animal landmarks detected"}

        landmarks = results.pose_landmarks.landmark

        # Example (dummy values for demonstration):
        body_length = abs(landmarks[mp_pose.PoseLandmark.RIGHT_HIP].x -
                          landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x)
        chest_width = abs(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x -
                          landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x)

        return {
            "Body Length": round(body_length, 3),
            "Chest Width": round(chest_width, 3),
            "Rump Angle": "TBD"
        }
