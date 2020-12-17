
package { 'docker.io':
    ensure => 'installed'
}

package { 'docker-compose':
    ensure => 'installed',
    require => Package['docker.io']
}

exec { 'clean':
    command => '/usr/bin/rm -rf sa-01',
    onlyif => '/bin/ls sa-01',
    logoutput => true,
    before => Exec['clone']
}

exec { 'clone':
    command => '/usr/bin/git clone https://github.com/Tikiram/sa-01.git',
    unless => "/bin/ls sa-01",
    require => Package['docker.io'],
    logoutput => true
}

exec { 'run':
    command => '/usr/bin/docker-compose -f ./sa-01/docker-compose.yml up --build -d',
    require => exec['clone'],
    logoutput => true
}