type ErrorType = {
  error: {
    data: {
      message?: string | string[];
      error?: string;
      statusCode?: number;
    };
  };
};
