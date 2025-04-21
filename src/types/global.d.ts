export {}

declare global {
  interface Window {
    global_config: {
      BASE_URL: string
    }
  }
}