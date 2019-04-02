defmodule NimbusApi.Nexmo do
  require Logger, warn: false

  def send_sms_to_number(number, message) do
    config = Application.get_env(:nimbus_api, NimbusApiWeb.Endpoint)[:nexmo]
    url = config[:host]
    body = Poison.encode!(%{
      "api_key": config[:api_key],
      "api_secret": config[:api_secret],
      "from": config[:from],
      "to": "#{number}",
      "text": "#{message}" 
    })
    headers = [{"Content-type", "application/json"}]
    HTTPoison.post(url, body, headers, [])
  end
  
end