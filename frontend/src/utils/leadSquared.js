import { apiRequest, generateJWT } from "./api";

export const sendLSQActivity = async ({ activityName, fields = [], account = 'academy' }) => {
  try {
    const jwt = await generateJWT();
    if (!jwt) throw new Error('Failed to generate JWT');

    await apiRequest(
      'POST',
      '/api/v3/lsq-events/send-activity/',
      {
        activity_name: activityName,
        account_name: account,
        fields,
      },
      { headers: { 'X-user-token': jwt } }

    )
  } catch (error) {
    console.error("Error sending LSQ activity:", error);
  }
}