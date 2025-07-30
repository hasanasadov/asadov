export const formatDateInput = (date: Date) => {
  return date.toISOString().slice(0, 7);
};

export const confirmAction = (message: string): boolean => {
  return window.confirm(message);
};

export const trimFormData = (data: {
  title1: string;
  title2: string;
  description: string;
  start: string;
  end?: string;
}) => {
  return {
    title1: data.title1.trim(),
    title2: data.title2.trim(),
    description: data.description.trim(),
    start: new Date(data.start),
    end: data.end ? new Date(data.end) : null,
  };
};
