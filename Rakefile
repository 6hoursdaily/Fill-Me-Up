require 'rake'
require 'rubygems'
require 'nokogiri'
require 'colored'
require 'betabuilder'
require 'active_record'

require File.expand_path(File.join(Dir.pwd, 'config/config.rb'))
include Config

BetaBuilder::Tasks.new do |config|
  # App Name
  config.target = "FillMeUp"

  # Xcode configuration profile
  config.configuration = "Adhoc"

end

task :default => ["build:iphone"]

namespace :db do
  desc "Drop and create the current database"
  task :create do
    ActiveRecord::Base.establish_connection(
      :adapter => "sqlite3",
      :dbfile  => ":memory:"
    )
    puts "Connection established"
    ActiveRecord::Base.connection.create_database(
      :database => 'db/development.sqlite3'
    )
    puts "Database created"
  end
end

namespace :setup do
  desc "Do all the setup procedures"
  task :all do
    Rake::Task['setup:xml'].invoke
    Rake::Task['setup:entitlements'].invoke
    Rake::Task['setup:rakefile'].invoke
  end

  desc "Copy the tiapp.xml file into build/iphone directory"
  task :xml do
    copy_xml
  end

  desc "Create the Entitlements.plist file in build/iphone directory"
  task :entitlements do
    create_entitlement_plist
  end

  desc "Copy the Rakefile to the build/iphone directory"
  task :rakefile do
    copy_rakefile
  end
end

namespace :compile do
  desc "Compile all assets"
  task :all do
    compile
  end

  desc "Compile SASS to JSS"
  task :styles do
    compile_sass
  end

  desc "Compile CoffeeScript into JS"
  task :coffee do
    compile_coffee
  end
end

namespace :build do
  desc "Build the app for iPhone"
  task :iphone do
    build
  end
end

def compile
  compile_coffee && compile_sass
end

def copy_xml
  unless File.exists?(File.join(Dir.pwd, 'build/iphone/tiapp.xml'))
    puts "Copying tiapp.xml to the build/iphone/ directory.".blue
    system("ln -s #{File.join(Dir.pwd, 'tiapp.xml')} #{File.join(Dir.pwd, 'build/iphone')}")
  end
end

def create_entitlement_plist
  entitlements = File.join(Dir.pwd, 'build/iphone/Entitlements.plist')
  unless File.exists?(entitlements)
    puts "Creating an Entitlements.plist (build/iphone) file since it doesn't exist.".blue
    File.open(entitlements, 'w') do |f|
      f.puts <<-LINE
<?xml versio="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>get-task-allow</key>
  <false/>
</dict>
</plist>
  LINE
    end
  end
end

def copy_rakefile
  unless File.exists?(File.join(Dir.pwd, 'build/iphone/Rakefile'))
    puts "Copying Rakefile to the buil/iphone directory.".blue
    system("ln -s #{File.join(Dir.pwd, 'Rakefile')} #{File.join(Dir.pwd, 'build/iphone')}")
  end
end

def compile_sass
  puts "Compiling stylesheets".blue
  compilation = system "sass --compass -C -t expand app/fill_me_up/stylesheets/app.sass > Resources/app.jss"
end

def compile_coffee
  puts "Compiling CoffeeScript".blue
  paths = `find app/fill_me_up -name '*.coffee'`.split("\n")
  compilation = (
  system "coffee -p --join --bare #{paths.join(' ')} > Resources/fill_me_up.js" and
  system "coffee -p --bare app/app.coffee > Resources/app.js"
  )

  if compilation
    puts "Successfully compiled CoffeeScript".green
  else
    puts "Error compiling CoffeeScript".red
  end

  compilation
end

def build(options={})
  return unless compile
  options[:device] ||= 'iphone'
  puts "Building with Titanium... (DEVICE_TYPE: #{options[:device]})".blue
  sh %Q{bash -c "#{TI_BUILD} run #{PROJECT_ROOT}/ #{IPHONE_SDK_VERSION} #{APP_ID} #{APP_NAME} #{APP_DEVICE} " \
| perl -pe 's/^\\[DEBUG\\].*$/\\e[35m$&\\e[0m/g;s/^\\[INFO\\].*$/\\e[36m$&\\e[0m/g;s/^\\[WARN\\].*$/\\e[33m$&\\e[0m/g;s/^\\[ERROR\\].*$/\\e[31m$&\\e[0m/g;'}
end
