<?php
// zz-mu-catcher.php
// Detect who issues Location redirects and append a backtrace to /var/www/html/wp-content/mu-debug.log

register_shutdown_function(function () {
    $headers = headers_list();
    $location = null;
    foreach ($headers as $h) {
        if (stripos($h, 'Location:') === 0) {
            $location = trim(substr($h, 9));
            break;
        }
    }

    if ($location) {
        $bt = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        $out  = date('c') . " - Shutdown detected redirect Location: " . $location . PHP_EOL;
        $out .= "Backtrace (most recent call first):" . PHP_EOL;
        $max = min(20, count($bt));
        for ($i = 0; $i < $max; $i++) {
            $frame = $bt[$i];
            $file  = isset($frame['file']) ? $frame['file'] : '[internal]';
            $line  = isset($frame['line']) ? $frame['line'] : '';
            $func  = (isset($frame['class']) ? $frame['class'] . ($frame['type'] ?? '') : '') . (isset($frame['function']) ? $frame['function'] : '[closure]');
            $out  .= "#{$i} {$func} called at {$file}:{$line}" . PHP_EOL;
        }
        $out .= PHP_EOL;
        file_put_contents('/var/www/html/wp-content/mu-debug.log', $out, FILE_APPEND);
    }
});