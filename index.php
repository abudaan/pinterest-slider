<?php

  $redirect_url = "https://abumarkub:8000/";
  $client_id = "4821776664906186821";
  $scope = "read_public,write_public";
  $state = "768uyFys";
  $url = "https://api.pinterest.com/oauth/?response_type=code&redirect_uri=$redirect_url&client_id=$client_id&scope=$scope&state=$state";

  echo "<a href='$url'>log in</a>";

?>