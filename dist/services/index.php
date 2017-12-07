<?php
    require_once('videofeed.class.php');

    $feed = new VideoFeed();
    $feed->setValue('keywords', 'handmaids');
    $feed->setValue('useType', 'Full Episode');
    $feed->setValue('sortBy', ':episodeNumber|asc');
    $arrFeeds = $feed->findVideos();

    $response = array(
        'status' => 1,
        'data' => $arrFeeds
    );

    echo json_encode($response);
?>