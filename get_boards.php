<?php

  $json = file_get_contents('php://input');
  $dataObject = json_decode($json);

  echo 'aap!';

?>