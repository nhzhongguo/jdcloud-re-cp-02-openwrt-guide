#!/bin/sh
set -eu

ifstatus wan6 | jsonfilter -e '@["ipv6-address"][0].address'
