export type NotificationSettings = {
  agendaRemindersEnabled: boolean;
  focusTimerAlertEnabled: boolean;
  soundEnabled: boolean;
};

export type InAppToast = {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "timer" | "info";
  timestamp: number;
};
