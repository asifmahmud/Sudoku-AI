<?php

class Countries extends BYTAPIConnection
{
    function getCountries($country_code = "")
    {
        if($country_code != "")
        {
            return $this->makeRequest("/countries/".$country_code);
        }
        return $this->makeRequest("/countries");
    }

    function search($name)
    {
        return $this->makeRequest("/search/country/".$name);
    }
}