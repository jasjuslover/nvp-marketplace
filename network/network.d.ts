declare type Payload = {
  queryKey: string[];
};

declare type AppMutationCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (error: string) => void;
};
