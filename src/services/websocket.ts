import { useConnectionStore } from "../stores/connection";
import { usePrinterStore } from "../stores/printer";

// subscribe to all the objects the app needs no matter what
const printerObjectsSubscribe = {
    "jsonrpc": "2.0",
    "method": "printer.objects.subscribe",
    "params": {
        "objects": {
            "motion_report": ['live_position', 'live_velocity', 'live_extruder_velocity'],
            "extruder": ['temperature', 'target', 'power', 'can_extrude'],
            "heater_bed": ['temperature', 'target', 'power'],
            "fan": ['speed', 'rpm'],
            "print_stats": ['filename', 'total_duration', 'print_duration', 'filament_used', 'state', 'info'],
            "filament_switch_sensor": ['filament_detected', 'enabled']
        }
    },
    "id": 5434
}

export async function wsAttemptConnection (){
    const connection = useConnectionStore();
    const printer = usePrinterStore();

    const ws = new WebSocket(`ws://${connection.moonrakerUrl}/websocket`);
    console.log(`Trying to start WS at ws://${connection.moonrakerUrl}/websocket`)
    connection.wsState = "Trying to Connect..."

    ws.onopen = () =>{
        console.log("Connected to Moonraker WebSocket");
        connection.wsState = "Connected"
        connection.wsIsConnected = true;
        connection.ws = ws;

        ws.send(JSON.stringify(printerObjectsSubscribe));
    }

    ws.onmessage = (event: MessageEvent) => {
        const response = event.data[0];
        printer.latestReading = response.result;
        // printer.toolTemperature = response.result.extruder.temperature;
        // console.log(response)
    };
    ws.onerror = () => {
        connection.wsState = "Failed to Connect"
    }
    ws.onclose = () => {
        connection.wsIsConnected = false;
        connection.wsState = "Connection Closed"
        connection.ws = null;
        console.log("Connection to Moonraker closed.");
    };
}