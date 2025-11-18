import os
from importlib.resources import files
from pathlib import Path
from google.colab import output
from IPython.display import Javascript, display
import json
import time
import base64


class ColabKit:
    def __init__(self, path='static'):
        """
        Initialize and load all JS tools under the provided directory.
        """
        self.path = files("colabkit").joinpath("static")
        self.tools = list(self.path.glob("*.js"))

    def loadTools(self, select_tools=[]):
        """
        Load the requested JS tools into Colab.
        """
        for tool in self.tools:
            if select_tools and tool.name not in select_tools:
                continue
            with open(tool) as fd:
                js_code = fd.read()
            display(Javascript(js_code))

    # -----------------------------------------------------------
    # CAMERA FUNCTIONS — mapped directly to your example
    # -----------------------------------------------------------

    def startCamera(self, camid=None, display="block"):
        """
        Python → JS: MediaManager.startCamera(...)
        """
        js = f"MediaManager.startCamera({json.dumps(camid)}, {json.dumps(display)})"
        return output.eval_js(js)

    def stopCamera(self):
        """
        Python → JS: MediaManager.stopCamera()
        """
        return output.eval_js("MediaManager.stopCamera()")

    def captureFrame(self):
        """
        Python → JS: MediaManager.captureFrame()
        """
        return output.eval_js("MediaManager.captureFrame()")

    def listCameras(self):
        """
        Python → JS: MediaManager.listCameras()
        """
        result = output.eval_js("MediaManager.listCameras()")
        # MediaManager zaten JSON string döndürüyor
        try:
            return json.loads(result)
        except:
            return result

    def changeCamera(self, camid):
        """
        Python → JS: MediaManager.changeCamera(deviceId)
        """
        js = f"MediaManager.changeCamera('{camid}')"
        return output.eval_js(js)

    def watchDeviceChanges(self):
        """
        Python → JS: MediaManager.watchDeviceChanges()
        """
        return output.eval_js("MediaManager.watchDeviceChanges()")

    def stopWatchingDevices(self):
        """
        Python → JS: MediaManager.stopWatchingDevices()
        """
        return output.eval_js("MediaManager.stopWatchingDevices()")

#os.environ['COLABKIT_TEST'] = '1'

if "COLABKIT_TEST" in os.environ:
    kit = ColabKit()
    kit.loadTools(["media.js"])

    kit.startCamera()
    print(kit.captureFrame())
    print(kit.listCameras())

    ids = []
    print('Camera Id')
    for cam in kit.listCameras():
        print(cam["deviceId"])
        ids.append(cam["deviceId"])

    camid = input("Select cam id:").strip()
    if camid in ids:
        print(kit.changeCamera(camid))
    else:
        print("Invalid camera id")




    time.sleep(5)
    print(kit.stopWatchingDevices())
    print(kit.stopCamera())

