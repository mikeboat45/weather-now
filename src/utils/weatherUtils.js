export const weatherCodeToIcon = (code) => {
  switch (code) {
    case 0:
      return "./assets/icon-sunny.webp";
    case 1:
    case 2:
    case 3:
      return "./assets/icon-partly-cloudy.webp";
    case 45:
    case 48:
      return "./assets/icon-fog.webp";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "./assets/icon-drizzle.webp";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "./assets/icon-rain.webp";
    case 71:
    case 73:
    case 75:
    case 77:
      return "./assets/icon-snow.webp";
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return "./assets/icon-rain.webp";
    case 95:
    case 96:
    case 99:
      return "./assets/icon-storm.webp";
    default:
      return "./assets/icon-sunny.webp";
  }
};
