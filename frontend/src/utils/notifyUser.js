export const showBrowserNotification = ({
  title = "Request Of Sub Teacher",
  message = "You have a new notification",
  icon = "https://img.icons8.com/?size=100&id=fS7NyZKyMzc0&format=png&color=000000",
  onClickHandler,
}) => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body: message,
      icon: icon,
    });
    notification.onclick = function (event) {
      event.preventDefault();
    };
  }
};
