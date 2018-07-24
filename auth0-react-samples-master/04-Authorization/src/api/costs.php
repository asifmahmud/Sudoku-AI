<?php

require_once("lib/bytapiconnection.php");

class Costs extends BYTAPIConnection
{
    function getCountry($country_code)
    {
        return $this->makeRequest("/costs/country/".$country_code);
    }

    function getLocation($geonameid)
    {
        return $this->makeRequest("/costs/location/".$geonameid);
    }

    function getHighlights($geonameid)
    {
        return $this->makeRequest("/costs/highlights/".$geonameid);
    }


}