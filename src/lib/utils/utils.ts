

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Format the month (e.g., Jan, Feb, Mar, etc.)
    const month = date.toLocaleString("en-US", { month: "short" });

    // Format the day with the appropriate suffix
    const day = date.getDate();
    const daySuffix = day % 10 === 1 && day !== 11 ? "st" :
                      day % 10 === 2 && day !== 12 ? "nd" :
                      day % 10 === 3 && day !== 13 ? "rd" : "th";

    // Get the year
    const year = date.getFullYear();

    // Format the time (e.g., 10:27)
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month} ${day}${daySuffix} ${year}, ${hours}:${minutes}`;
}

export function getDeviceOS() {
    const userAgent = window.navigator.userAgent;

    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac OS")) return "Mac OS";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
    if (userAgent.includes("Linux")) return "Linux";

    return "Unknown OS";
}

export function getDeviceId() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

    const deviceID = `${userAgent}-${platform}-${randomString}`;

    return deviceID
}

export async function getDeviceIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return "Unknown IP";
    }
}

export async function getDeviceInfo() {
    // let locationObj = {
    //     latitude: "",
    //     longitude: "",
    //     address: ""
    // }
    const locationObj: Coordinates = { latitude: 0, longitude: 0 };

    const deviceInfo = {
        device_os: getDeviceOS(),
        // device_model: getDeviceModel(),
        device_model: 'Desktop',
        device_id: getDeviceId(),
        device_ip: await getDeviceIP(),
        location: `${locationObj.latitude}, ${locationObj.longitude}`
    };

    // Attempt to get location using Geolocation API
    try {
        const location = await getLocation();
        locationObj.latitude = location.latitude;
        locationObj.longitude = location.longitude;
    } catch (error) {
        console.error("Geolocation failed, using IP-based geolocation as fallback:", error);

        locationObj.latitude = 0;
        locationObj.longitude = 0;
        // locationObj.address = ipLocation.address;
    }

    console.log(deviceInfo);

    return deviceInfo;
}

type Coordinates = {
    latitude: number;
    longitude: number;
};
function getLocation(): Promise<Coordinates>{
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}


export const copyToClipboard = async (text: string | number) => {
    try {
        await window.navigator.clipboard.writeText(String(text));
        alert("Copied to clipboard!");
    } catch (err) {
        console.error(
            "Unable to copy to clipboard.",
            err
        );
        alert("Copy to clipboard failed.");
    }
}