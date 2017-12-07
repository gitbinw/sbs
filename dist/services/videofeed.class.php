<?php
    require_once ('config.php');

    class VideoFeed {
        private $baseApi = '';
        private $keywords = '';
        private $program = '';
        private $useType = '';
        private $sortBy = '';
        
        public function __construct() {
            $this->baseApi = BASE_API_URL;
            $this->keywords = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';
            $this->program = isset($_REQUEST['program']) ? $_REQUEST['program'] : '';
            $this->useType = isset($_REQUEST['useType']) ? $_REQUEST['useType'] : '';
            $this->sortBy = isset($_REQUEST['sortBy']) ? $_REQUEST['sortBy'] : '';
        }
        
        private function curlRequest($url) {
            $content = "";
            $curl = curl_init();
                
            //set up header
            $header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
            $header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
            $header[] = "Cache-Control: max-age=0";
            $header[] = "Connection: keep-alive";
            $header[] = "Keep-Alive: 300";
            $header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
            $header[] = "Accept-Language: en-us,en;q=0.5";
            $header[] = "Pragma: "; //browsers keep this blank.
                
            curl_setopt($curl, CURLOPT_URL, $url);
            
            //curl_setopt($curl, CURLOPT_PROXY, 'http://tvsnadmin:*ouTL9h@proxy:8080'); 
            curl_setopt($curl, CURLOPT_FAILONERROR, true);
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            //if (SSL_VERIFICATION === TRUE) {
            //  curl_setopt($curl, CURLOPT_SSLVERSION, 3);
            //  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
            //  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
            //} else {
            //  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            //}
            
            curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3');
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_REFERER, 'http://www.google.com');
            curl_setopt($curl, CURLOPT_ENCODING, 'gzip,deflate');
            curl_setopt($curl, CURLOPT_AUTOREFERER, true);
            //curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            //curl_setopt($curl, CURLOPT_TIMEOUT, 10);
            $content = curl_exec($curl); //execute the curl command

            if (!$content) {
                echo "cURL error number:" .curl_errno($curl);
                echo "cURL error:" . curl_error($curl);
            }
            
            curl_close($curl); 

            return $content;
        }
        private function wrapApi() {
            $urlProgram = '';
            $urlUseType = '';
            $urlSort = '';
            $url = $this->baseApi . '?';
            $arrUrls = array();
            $arrPrograms = array();
            if ($this->keywords) $arrUrls['q'] = $this->keywords;
            if ($this->program) $arrPrograms[] =  '{programName}{' . $this->program . '}';
            if ($this->useType) $arrPrograms[] = '{useType}{' . $this->useType . '}';
            if ($this->sortBy) {
                if (is_array($this->sortBy)) {
                    $urlSort = implode(',', $this->sortBy); 
                } else {
                    $urlSort = $this->sortBy; 
                }
            }

            if (count($arrPrograms) > 0) $arrUrls['byCustomValue'] = implode(',', $arrPrograms);

            if ($urlSort) $arrUrls['sort'] = $urlSort;

            return $url . http_build_query($arrUrls, '', '&');
        }
        private function requestFeeds($url) {
            //$arrFeeds = $this->curlRequest($url);
            $strJSON = file_get_contents($url);
            $objFeeds = json_decode($strJSON);

            return $objFeeds->itemListElement;
        }

        public function getValue($var) {
            return $this->{$var};
        }
        
        public function setValue($var, $value) {
            $this->{$var} = $value;
        }

        public function findVideos() {
            $feeds = $this->requestFeeds( $this->wrapApi() );
            $arrFilteredFeeds = array();
            foreach($feeds as $feed) {
                if ($feed->type == 'Episode') {
                    $tmp = array(
                        'name' => $feed->name,
                        'thumbnail' => $feed->thumbnailUrl,
                        'title' => $feed->displayTitles->title,
                        'subtitle' => $feed->displayTitles->subtitle
                    );
                    $arrFilteredFeeds[] = $tmp;
                }
            }

            return $arrFilteredFeeds;
        }
    }

?>